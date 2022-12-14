import { useT } from '@dsh/core/frontend';
import { Breadcrumbs } from '@dsh/ui/Breadcrumbs';
import { Col } from '@dsh/ui/Col';
import { Flex } from '@dsh/ui/Flex';
import { Heading } from '@dsh/ui/Heading';
import { NextPage } from 'next';
import { useRequireLogin } from '../..';

const Page: NextPage = () => {
  const { t, T } = useT();
  useRequireLogin();

  return (
    <Flex>
      <Col nr="1">
        <Breadcrumbs path={[t('paths.index'), t('myAccount.index')]} />
        <Heading size="1">
          {t('schulhof.welcome', {
            user: {
              name: 'Jesper Engberg',
            },
          })}
        </Heading>
        <T
          as="p"
          vars={{
            lastLogin: new Date(),
            TheftLink: (c) => (
              <a
                href={`/${t('paths.index')}/${t('myAccount.index')}/${t(
                  'myAccount.reportTheft'
                )}`}
              >
                {c}
              </a>
            ),
          }}
        >
          schulhof.lastLogin
        </T>
      </Col>
    </Flex>
  );
};

export default Page;
