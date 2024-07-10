import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeFavourites } from "../store/favouritesSlice"; // Import the initializeFavourites action
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const Favourites = () => {
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const favRef = ref(db, `favourites/${user.uid}`);
      get(favRef).then((snapshot) => {
        if (snapshot.exists()) {
          const favs = snapshot.val();
          const favCountries = Object.keys(favs).filter(key => favs[key]);
          setFavourites(favCountries);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountriesData(response.data);
    };

    fetchCountriesData();
  }, []);

  const getCountryData = (countryName) => {
    return countriesData.find(country => country.name.common === countryName);
  };

  return (
    <Container fluid>
      <Row xs={2} md={3} lg={4} className="g-3">
        {favourites.map((countryName) => {
          const country = getCountryData(countryName);
          if (!country) return null;

          return (
            <Col key={country.name.official} className="mt-5">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  className="rounded h-50"
                  src={country.flags.svg}
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Favourites;
