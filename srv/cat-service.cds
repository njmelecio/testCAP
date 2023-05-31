using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly entity Books as projection on my.Books;
    function checkStock() returns String;
    function getCategories() returns String;
}
