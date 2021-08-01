/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const PageNotFound = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>صفحه مورد نظر پیدا نشد</Header>
          <TitleAndMetaTags title="ری‌اکت - صفحه یافت نشد" />
          <div css={sharedStyles.markdown}>
            <p>ما نتوانستیم آن چیزی که به دنبالش بودید را پیدا کنیم</p>
            <p>
              لطفاً با صاحب سایتی که شما را به آدرس اصلی پیوند داده تماس بگیرید
              و به او اطلاع دهید که پیوند آن‌ها خراب است.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default PageNotFound;
