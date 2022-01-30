import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { gql } from "urql";
import { usePingQuery } from "~/graphql/codegen.generated";

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const [result] = usePingQuery();

  return (
    <div>
      {t("hello-world")} {result.data?.ping ?? "pinging"}
    </div>
  );
};

export default Home;

gql`
  query Ping {
    ping
  }
`;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale!, ["common"])),
    },
  };
};
