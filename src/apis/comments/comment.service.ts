import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review/entities/review.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll() {
    return await this.commentRepository.find();
  }
  async findOne({ commentId }) {
    return await this.commentRepository.findOne({ where: { id: commentId },relations:['review'] });
  }
  async find({reviewId}){
    return await this.commentRepository.find({where:{review:reviewId}})
  }
  async create({ createCommentInput }) {
    const { reviewId, ...comment } = createCommentInput;
    const result1 = await this.reviewRepository.findOne({
      id: reviewId,
    });
    const result2 = await this.commentRepository.save({
      ...comment,
      review: result1,
    });
    return result2;
  }
  async delete({reviewId,commentId}){
    const comments = await this.commentRepository.find({where:{review:reviewId}})
    console.log("========================")
    console.log("========================")
    console.log("========================")
    console.log("========================")
    console.log("========================")
    console.log(comments)
    // const comment = await this.commentRepository.findOne({where:{commentId:comments.Comment.id}})
    // console.log(comment)
  }
}
