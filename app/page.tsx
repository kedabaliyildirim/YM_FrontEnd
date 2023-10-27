/* Components */
import { Key } from "react";
import { connectToDatabase } from "./database/databaseConnection";
import { getMovies } from "./database/databaseRequests";

export default async function IndexPage() {
  connectToDatabase();
  const movies = getMovies(1, 20);
  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {(await movies).map((movie) => (
          <div
            key={movie.movieName}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "300px", // Adjust as needed
              textAlign: "center",
            }}
          >
            <img
              src={movie.imageURL} // Replace with the actual property containing the image URL
              alt={movie.movieName}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%", // Adjust as needed
                maxHeight: "100px", // Adjust as needed
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h2>{movie.movieName}</h2>
            <p>{movie.movieReleaseDate}</p>
            {movie.movieProvider &&
              Object.keys(movie.movieProvider).map((countryCode) => (
                <div
                  key={countryCode}
                  style={{
                    marginTop: "10px",
                    maxHeight: "40px", // Set a maximum height for the country code container
                    overflow: "hidden",
                  }}
                >
                  {countryCode === "US" && (
                    <>
                      <h3>{countryCode}</h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {movie.movieProvider[countryCode].map((provider) => (
                          <img
                            key={provider.provider_id}
                            src={provider.logo_path}
                            alt={`${provider.provider_name} Logo`}
                            style={{
                              width: "50px", // Adjust as needed
                              height: "50px", // Adjust as needed
                              objectFit: "contain",
                              marginBottom: "5px",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Redux Toolkit",
};
