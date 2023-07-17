export interface IReviews {
  _id?: string;
  reviewer: { _id: string; name: { firstName: string; lastName: string } };
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

export interface IBookResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IBook;
}

export interface IBookFormValues extends Partial<IBook> {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
}

export type IReviewer = {
  name?: {
    firstName?: string;
    lastName?: string;
  };
};
