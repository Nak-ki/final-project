
## Description

Final project

## User (Admin & Manager):
- Admin and managers, who have an active account can login and refresh their tokens;
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
- Have pagination: limit: 25, sort by: id, name, surname, email, phone, age, course, course-format, course-type, status, sum, already-paid, group, created-at, manager
  (ASC: id, DESC: -id)



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


