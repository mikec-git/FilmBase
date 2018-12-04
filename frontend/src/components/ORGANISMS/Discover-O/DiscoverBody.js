import React from 'react';
import { withRouter } from 'react-router-dom';
import FilmList from '../../../components/ORGANISMS/FilmList-O/FilmList';
import SpinnerSecondary from '../../../components/ATOMS/UI-A/SpinnerSecondary-A/SpinnerSecondary';
import Arrow from '../../../components/ATOMS/UI-A/ClickImage-A/ClickImage';
import PageCount from '../../../components/ATOMS/UI-A/PageCount-A/PageCount';

import LeftArrow from '../../../assets/img/arrow-left-circle.svg';
import RightArrow from '../../../assets/img/arrow-right-circle.svg';
import c from './DiscoverBody.module.scss';

const discover = (props) => {
  const classesLeftArr  = [c.DiscoverBody__Arrows, c.DiscoverBody__Arrows_left].join(' ');
  const classesRightArr = [c.DiscoverBody__Arrows, c.DiscoverBody__Arrows_right].join(' ');
  let classesResults    = [c.DiscoverBody__List, c.DiscoverBody__List_hide].join(' ');

  let results         = null,
      leftArrow       = null,
      rightArrow      = null,
      loadingSpinner  = <SpinnerSecondary />;

  if(Array.isArray(props.results) && props.results.length > 0) {
    const sliceStart  = (props.page-1) * props.listLength;
    const sliceEnd    = props.page * props.listLength;

    results = (
      <FilmList
        filmList={props.results.slice(sliceStart, sliceEnd)}
        videoClicked={props.videoClicked}
        onImgLoad={props.onImgLoad}
        pathBase={props.location.pathname}
        mediaType={props.mediaType}
        isDiscover
        hasPathPrefix />
    );      
  }

  if(props.page > 1) {
    leftArrow = (
      <Arrow
        className={classesLeftArr}
        context='arrowRound'
        imgSrc={LeftArrow}
        imgAlt='Left Arrow'
        clickParam={'left'}
        clicked={props.arrowClicked} />);
  }

  if(props.page < props.maxPage) {
    rightArrow = (
      <Arrow
        className={classesRightArr}
        context='arrowRound'
        imgSrc={RightArrow}
        imgAlt='Right Arrow'
        clickParam={'right'}
        clicked={props.arrowClicked} />);
  }    

  if(props.isImgLoaded) {      
    classesResults = c.DiscoverBody__List;
    loadingSpinner = null;
  }

  return (
    <> 
      {loadingSpinner}
      <section className={classesResults}>
        {results}
        {leftArrow}
        {rightArrow}            
        <PageCount 
          context='discover' 
          page={props.page} 
          maxPage={props.maxPage} />
      </section>
    </>
  );
}
 
export default withRouter(discover);