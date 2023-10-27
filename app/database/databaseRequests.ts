import { database } from "./databaseConnection";
import { ObjectId } from "mongodb";

export interface Movie {
  id: ObjectId;
  movieName: string;
  movieGenre: string[]; // Assuming movieGenre is an array of strings
  movieReleaseDate: string;
  imageURL: string;
  movieProvider: {
    [countryCode: string]: {
      logo_path: string;
      provider_id: number;
      provider_name: string;
      display_priority: number;
    }[];
  };
}

export async function getMovies(
  pageNumber: number,
  pageSize: number
): Promise<Movie[]> {
  try {
    const skipAmount = pageSize * (pageNumber - 1);

    const movies = await database
      .collection<Movie>("movies")
      .find()
      .skip(skipAmount)
      .limit(pageSize)
      .toArray();

    if (movies.length > 0) {
      return movies;
    } else {
      throw new Error("No movies found");
    }
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it
  }
}
