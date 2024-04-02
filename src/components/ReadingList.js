import React from "react";
import { motion } from "framer-motion";
import { X } from "react-feather";

import VisuallyHidden from "./VisuallyHidden";
import styles from "./ReadingList.module.css";

function ReadingList({ books, handleRemoveBook }) {
  const [highlightedBook, setHighlightedBook] = React.useState(null);
  const transition = { type: "spring", stiffness: 400, damping: 60 };
  return (
    <>
      <div className={styles.wrapper} onMouseLeave={() => setHighlightedBook(null)}>
        <h2>Reading List</h2>
        <ol className={styles.books}>
          {books.map((book, bookIndex) => {
            const reverseBookIndex = books.length - 1 - bookIndex;
            let height = Math.max(50 - reverseBookIndex * 5, 20);

            if (highlightedBook === bookIndex) {
              height = 200;
            }
            return (
              <li
                key={book.isbn}
                style={{
                  height,
                }}
                onMouseEnter={() => setHighlightedBook(bookIndex)}
              >
                <motion.img
                  layoutId={`book-cover-${book.isbn}`}
                  alt={book.name}
                  src={book.coverSrc}
                  draggable={false}
                  className={styles.bookCover}
                  transition={transition}
                />
                <motion.button
                  layout={true}
                  className={styles.deleteBtn}
                  onClick={() => handleRemoveBook(book)}
                  transition={transition}
                  onFocus={() => setHighlightedBook(bookIndex)}
                >
                  <X />
                  <VisuallyHidden>Remove {book.name}</VisuallyHidden>
                </motion.button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default ReadingList;
