import { verifyToken } from "@app/api/imtiaz/auth";

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  try {
    verifyToken(token);
    return { props: {} };
  } catch (error) {
    return { redirect: { destination: "/login", permanent: false } };
  }
}
