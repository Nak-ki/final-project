
## Description

Final project

# Backend

## User (Admin & Manager):
- Admin and managers, who have an active account can login, refresh their tokens and logout;
- User can create comments in Orders, after that this Order begins to be controlled by this user
(Impossible do it when this order already controlled by another user!);
- Get all orders;


### Admin:
- Can create Managers;
- Get all users, with pagination, limit: 25, sort by default ( createdAt: -1(DESC));
- Can create link for activate manager's account;

### Manager:
- Can activate account use link;


## Orders
- Can update order: fields can be empty; 
- Have pagination: limit: 25, sort by: id, name, surname, email, phone, age, course, course-format, course-type, status, sum, already-paid, group, created-at, manager
  (ASC: id, DESC: -id);
- Have filtration by name, surname email, phone, age, course, course_format, course_type, status, group, start_date, end_date, manager (can get orders only logged user );


## Groups
- Can create group;
- Can get all groups;


# Frontend

## Login Page
- Can login with credentials: email: admin@gmail.com password: admin;

## Orders Page
- Sorting, Filtration, Pagination.


## Installation

```bash
$ cd backend

$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start

```


