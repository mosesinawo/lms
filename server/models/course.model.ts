import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IComment extends Document {
  find(arg0: (item: any) => any): unknown;
  push(newQuestion: any): unknown;
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

interface ILink extends Document {
  title: object;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  descriptions: string;
  videoUrl: string;
  videoThumbnail: {
    public_id: string;
    url: string;
  };
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment;
}

interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview;
  courseData: ICourseData[];
  ratings: number;
  purchased: number;
}

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

const linkSchema = new Schema<ILink>({
  title: Object,
  url: String,
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  descriptions: String,
  suggestion: String,
  questions: [commentSchema],
  videoPlayer: String,
  links: [linkSchema],
  videoLength: Number,
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "Not more than 500 chars"],
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: Number,
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: String,
    required: true,
    
  },
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benefits: [{title:String}],
  prerequisites: [{title:String}],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0
  },
  purchased: {
    type: Number,
    default: 0,
    
  },
});


const courseModel :Model<ICourse>= mongoose.model("Course", courseSchema)

export default courseModel;