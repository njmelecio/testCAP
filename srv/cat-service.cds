using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Books as projection on my.Books;
    entity Authors as projection on my.Authors;
    function checkStock() returns String;
    function getCategories() returns String;
    action samplePost(
        ![firstName]: String
    ) returns String;
    action updateAuthor(
        ![authorId]: String,
        ![firstName]: String,
        ![lastName]: String,
    ) returns String;
}
