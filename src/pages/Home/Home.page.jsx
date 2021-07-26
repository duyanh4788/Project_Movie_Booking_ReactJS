import React from "react";
// rfce
import NavigationTabsOnePage from "../Navigation Tab/NavigationTabsOne.page";
// material
import { Container } from "@material-ui/core";
//function component carousel slider
import CarouselSlick from "../Carousel/Carousel.Slick";
// carousel list phim
import ListPhim from "../ListFlim/Listphim.page";
//function component styled materiall
import FooterCarousel from "../Footer/FooterCarousel";
import DropDowns from "../DropDowns/DropDowns";

/**
 *  8-05-02021 Vũ Duy Anh
 */

function Home() {
  return (
    <>
      <CarouselSlick />
      <DropDowns />
      <Container maxWidth="lg">
        <ListPhim />
        <NavigationTabsOnePage />
      </Container>
      <FooterCarousel />
    </>
  );
}

export default Home;
