interface IReviews {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  addedBy: string;
  reviews?: IReviews[];
}

export interface ApiResponse {
  data: IBook[];
  message: string;
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  statusCode: number;
  success: boolean;
}

export interface IBookFormValues extends Partial<IBook> {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
}
