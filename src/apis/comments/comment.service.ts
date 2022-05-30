import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review/entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.commentRepository.find();
  }
  async findOne({ commentId }) {
    return await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['review', 'user'],
    });
  }
  async findReComments({ reviewId, commentId }) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.review', 'review')
      .leftJoinAndSelect('comment.user', 'user')
      .where('review.id = :reviewId AND comment.parentId = :parentId ', {
        reviewId: reviewId,
        parentId: commentId,
      })
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
    console.log(comments);
    return comments;
  }
  async findReviewComments({ reviewId }) {
    const review = await this.reviewRepository.findOne({
      where: { reviewId },
    });
    return await this.commentRepository.find({
      where: { review },
      relations: ['user', 'review'],
    });
  }

  async findUserComments({ email }) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return await this.commentRepository.find({ where: { user: user } });
  }
  async create({ createCommentInput, currentUser }) {
    const { reviewId, ...comment } = createCommentInput;
    const review = await this.reviewRepository.findOne({
      id: reviewId,
    });
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const result = await this.commentRepository.save({
      ...comment,
      user,
      review,
    });
    return result;
  }
  async createReComment({ commentId, createCommentInput, currentUser }) {
    const { reviewId, ...comment } = createCommentInput;
    const review = await this.reviewRepository.findOne({
      id: reviewId,
    });
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });
    const result = await this.commentRepository.save({
      ...comment,
      parentId: commentId,
      user,
      review,
    });
    return result;
  }
  async delete({ commentId, currentUser }) {
    const user = await this.userRepository.findOne({
      email: currentUser.email,
    });

    const result = await this.commentRepository.softDelete({
      id: commentId,
      user,
    });

    return result.affected ? true : false;
  }
}
