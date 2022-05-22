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
      relations: ['review'],
    });
  }
  async findReviewComments({ reviewId }) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    return await this.commentRepository.find({ where: { review: review } });
  }

  async findUserComments({ email }) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return await this.commentRepository.find({ where: { user: user } });
  }
  async create({ createCommentInput }) {
    const { email, reviewId, ...comment } = createCommentInput;
    const result1 = await this.reviewRepository.findOne({
      id: reviewId,
    });
    const result2 = await this.userRepository.findOne({
      email: email,
    });
    const result3 = await this.commentRepository.save({
      ...comment,
      user: result2,
      review: result1,
    });
    return result3;
  }
  async delete({ commentId }) {
    const result = await this.commentRepository.softDelete({ id: commentId });
    return result.affected ? true : false;
  }
}
