import React from "react";
import {Link} from "react-router-dom";

const BookItem = (
    {
        book = {"kind":"books#volume","id":"cF5tdOH8AyoC",
            "etag":"+XLSC7dSISY",
            "selfLink":"https://www.googleapis.com/books/v1/volumes/cF5tdOH8AyoC",
            "volumeInfo":{"title":"One Bad Apple","authors":["Sheila Connolly"],
                "publisher":"Penguin","publishedDate":"2008-08-05",
                "description":"There's a killer in the orchard-and he's rotten to the core. INCLUDES RECIPES Meg Corey has come to the quaint New England town of Granford, Massachusetts, to sell her mother's old colonial home and apple orchard. Instead, she becomes embroiled in development plans that include her land, and her former flame from Boston. When he's found dead in the new septic tank on her property, the police immediately suspect Meg, whose only ally in town is the plumber Seth Chapin. Together, they'll have to peel back the layers of secrecy that surround the deal in order to find the real murderer, and save the orchard.","industryIdentifiers":[{"type":"ISBN_10","identifier":"0425223043"},{"type":"ISBN_13","identifier":"9780425223048"}],
                "readingModes":{"text":false,"image":false},"pageCount":276,
                "printType":"BOOK","categories":["Fiction"],"averageRating":3.5,"ratingsCount":17,
                "maturityRating":"NOT_MATURE","allowAnonLogging":false,
                "contentVersion":"1.4.4.0.preview.0","panelizationSummary":{"containsEpubBubbles":false,
                    "containsImageBubbles":false},
                "imageLinks":{"smallThumbnail":"http://books.google.com/books/content?id=cF5tdOH8AyoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail":"http://books.google.com/books/content?id=cF5tdOH8AyoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
                "language":"en",
                "previewLink":"http://books.google.com/books?id=cF5tdOH8AyoC&printsec=frontcover&dq=apple&hl=&cd=1&source=gbs_api",
                "infoLink":"http://books.google.com/books?id=cF5tdOH8AyoC&dq=apple&hl=&source=gbs_api",
                "canonicalVolumeLink":"https://books.google.com/books/about/One_Bad_Apple.html?hl=&id=cF5tdOH8AyoC"},
            "saleInfo":{"country":"US","saleability":"NOT_FOR_SALE","isEbook":false},
            "accessInfo":{"country":"US","viewability":"PARTIAL","embeddable":true,"publicDomain":false,"textToSpeechPermission":"ALLOWED",
                "epub":{"isAvailable":false},"pdf":{"isAvailable":false},
                "webReaderLink":"http://play.google.com/books/reader?id=cF5tdOH8AyoC&hl=&source=gbs_api",
                "accessViewStatus":"SAMPLE","quoteSharingAllowed":false},
            "searchInfo":{"textSnippet":"There&#39;s a killer in the orchard-and he&#39;s rotten to the core."}}
    }
) => {
    let thumbnail = false;
    if (book && book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
        thumbnail = true;
    }
    let detailsLink = "/details/" + book.id
    return(
        <div className="list-group-item">
            <Link className="text-decoration-none" to={"/details/" + book.id}>
               <div className="m-3 mb-5 text-black">
                   <>{thumbnail && <img className="col-12 mb-4" src={book.volumeInfo.imageLinks.thumbnail}/>}</>
                   <span className="mt-5">{book.volumeInfo.title}</span>
               </div>
            </Link>
        </div>
    );
};
export default BookItem;