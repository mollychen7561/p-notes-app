import { NotesProvider } from "./path/to/NotesContext";

function MyApp({ Component, pageProps }) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  );
}

export default MyApp;
