import React from 'react';
import PropTypes from 'prop-types';
import HTMLParser from 'react-html-parser';

import NotFound from '../NotFound/NotFound';
import Section from '../../layout/Section/Section';
import PageTitle from '../../common/PageTitle/PageTitle';
import SideImage from '../../common/SideImage/SideImage';
import DetailsBox from '../../common/DetailsBox/DetailsBox';
import DetailsImage from '../../common/DetailsImage/DetailsImage';
import List from '../../common/List/List';
import ListItem from '../../common/ListItem/ListItem';
import OrderForm from '../../features/OrderForm/OrderFormContainer';

import { promoPrice } from '../../../utils/promoPrice';

import styles from './Trip.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Trip = ({ error, name, image, cost, days, description, country, intro, id }) => {
  let value = cost.slice(1).replace(',', '');

  if (error) return <NotFound />;
  else return (
    <Section>
      <Grid>
        <PageTitle text={name} />
      </Grid>
      <DetailsBox>
        <DetailsImage>
          <SideImage source={image} />
        </DetailsImage>
        <Grid>
          <Row>
            <Col md={12} lg={4}>
              <div className={styles.intro}>
                {HTMLParser(intro)}
              </div>
              <List variant='light'>
                <ListItem title={`<strong>Duration:</strong> ${days} days`} icon='calendar-alt' />
                <ListItem promo={'yes'} title={`<strong>Happy hour price: from $${promoPrice(value, 20)}</strong>`} icon='percentage' />
                <ListItem title={`<strong>Standard price:</strong> from ${cost}`} icon='money-bill-wave' />
              </List>
            </Col>
          </Row>
        </Grid>
      </DetailsBox>

      <Grid>
        <Row>
          <Col xs={12}>
            <PageTitle text='Trip details' />
            {HTMLParser(description)}
            <OrderForm tripCost={cost} trip={{ 'tripName': name, 'tripId': id, 'countryCode': country.alpha3Code }}></OrderForm>
          </Col>
        </Row>
      </Grid>

      <Grid>
        <PageTitle text={`About ${country.name}`} />
      </Grid>
      <DetailsBox>
        <DetailsImage>
          <SideImage source={country.flag} />
        </DetailsImage>
        <Grid>
          <Row>
            <Col md={12} lg={4}>
              <List variant='light'>
                <ListItem title={`<strong>Capital:</strong> ${country.capital}`} icon='city' />
                <ListItem title={`<strong>Population:</strong> ${country.population / 1000000} millions`} icon='users' />
                <ListItem title={`<strong>Currency:</strong> ${country.currencies[0].symbol} (${country.currencies[0].name})`} icon='money-bill-wave' />
              </List>
            </Col>
          </Row>
        </Grid>
      </DetailsBox>
    </Section>
  );
};

Trip.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  cost: PropTypes.string,
  days: PropTypes.number,
  description: PropTypes.string,
  country: PropTypes.object,
  id: PropTypes.string,
};

export default Trip;
