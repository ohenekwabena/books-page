import React from "react";

import DATA from "../data";

import BookGrid from "./BookGrid";
import ReadingList from "./ReadingList";
import styles from "./BookPage.module.css";
import { LayoutGroup } from "framer-motion";

function BookPage() {
  const [books, setBooks] = React.useState(DATA);

  function toggleBook(toggledBook) {
    const currentBooks = books.filter((book) => book.isbn !== toggledBook.isbn);

    const nextBooks = [...currentBooks, { ...toggledBook, selected: !toggledBook.selected }];
    setBooks(nextBooks);
  }

  const selectedBooks = books.filter((book) => book.selected);
  const unselectedBooks = books.filter((book) => !book.selected);

  return (
    <LayoutGroup>
      <div className={styles.wrapper}>
        <BookGrid className={styles.grid} books={unselectedBooks} handleSelectBook={toggleBook} />
        {selectedBooks.length > 0 && <ReadingList books={selectedBooks} handleRemoveBook={toggleBook} />}
      </div>
    </LayoutGroup>
  );
}

export default BookPage;
