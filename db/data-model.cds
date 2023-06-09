namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
  lang: String;
  authorId: String(2);
}

entity Authors {
  key authorId: String(2);
  firstname  : String;
  lastname  : String;
}

view 
  OrderBooksByStocks as
select 
  b.title, 
  b.lang,
  CONCAT(CONCAT(a.firstname, ' '), a.lastname) as fullname,
  b.stock
from 
  Books as b
join 
  Authors as a
on 
  b.authorId = a.authorId
where 
  b.stock >= 200
order by stock desc, fullname desc;