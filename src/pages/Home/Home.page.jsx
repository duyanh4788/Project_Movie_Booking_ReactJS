import React, { useEffect, useState } from "react";
// rfce
import NavigationTabsOnePage from "../Navigation Tab/NavigationTabsOne.page";
// material
import { Container, withStyles } from "@material-ui/core";
//function component carousel slider
import CarouselSlick from "../Carousel/Carousel.Slick";
// carousel list phim
import ListPhim from "../ListFlim/Listphim.page";
//function component styled materiall
import { styled } from "./Home.styles";
import FooterCarousel from "../Footer/FooterCarousel";
import DropDowns from "../DropDowns/DropDowns";
import Loader from "../../components/Loader/Loader";

/**
 *  8-05-02021 Vũ Duy Anh
 */

function Home() {
  const [loading, setLoading] = useState(null);
  console.log(loading);
  useEffect(() => {
    setTimeout(() => {
      setLoading("e");
    }, 1000);
  }, []);
  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <>
          <CarouselSlick />
          <DropDowns />
          <Container maxWidth="lg">
            <ListPhim />
            <NavigationTabsOnePage />
          </Container>
          <FooterCarousel />
        </>
      )}
    </>
  );
}

export default withStyles(styled)(Home);
