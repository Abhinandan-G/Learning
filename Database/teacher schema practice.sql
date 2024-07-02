-- table creation

create table teacher(
 teacher_id integer,
 teacher_name character varying,
 teacher_age integer,
 teacher_gender character varying,
 address_id integer,
 PRIMARY KEY (teacher_id));

create table subject(
	subject_id integer,
	subject_name character varying,
	teacher_id integer
);

create table classes(
	class_id integer,
	class_name character varying,
	teacher_id integer,
	PRIMARY KEY (class_id)
);

create table teacher_address(
	address_id integer,
	door_no character varying,
	street_name character varying,
	area character varying,
	district character varying,
	pincode integer);
	
-- adding constraints

alter table teacher_address add constraint ap_key primary key (address_id);

alter table subject add constraint sp_key primary key (subject_id);


alter table teacher add constraint tf_key foreign key (address_id) references teacher_address (address_id);

alter table subject add constraint sf_key foreign key (teacher_id) references teacher (teacher_id);

alter table classes add constraint cf_key foreign key (teacher_id) references teacher (teacher_id);

alter table teacher drop constraint tf_key;
alter table subject drop constraint sf_key;
alter table classes drop constraint cf_key;


-- inserting values


insert into teacher values (1,'santhosh',35,'male',1),(2,'ppk',50,'male',2),(3,'selva',40,'male',3);

insert into teacher_address values (1,'53b','nehru street','thoraipakkam','chennai',600001),
	(2,'63c','gandhi street','navalur','chennai',600002),
	(3,'45f','podhigai apartments','thoraipakkam','chennai',600003);

insert into subject values(1,'maths',1),(2,'physics',3),(3,'dsa',1);

insert into classes values(1,'abs02',1),(2,'abs03',2); // 

-----------------------------------------------------------------------------------

-- Fetch all data from teacher table
select * from teacher;


-- Add 2 new rows to Subjects
insert into subject values (4,'os',2),(5,'co',3);

-- Delete 1 from Classes table
delete from classes where class_id = 1;

-- Add new column age -to teacher table
alter table teacher add age integer;

-- update 2 columns in teachers table

Update teacher set teacher_age = 34, teacher_name = "Santhosh kumar" where teacher_id = 1;

-- Fetch teachers, their subjects (a teacher can handle multiple subjects)
select  teacher.teacher_name,subject.subject_name 
	from teacher inner join subject on teacher.teacher_id = subject.teacher_id;
	
	
-- Fetch all classes and respective class teacher's name and age
select classes.class_name, teacher.teacher_name,teacher.teacher_age 
	from teacher inner join classes on classes.teacher_id = teacher.teacher_id;

select * from classes;

insert into classes values(3,'abs08',1),(4,'abso6',3);

-- Fetch all classes and respective class teacher's name, age and address

select classes.class_name, teacher.teacher_name,teacher.teacher_age,
	teacher_address.door_no,teacher_address.street_name,teacher_address.area,teacher_address.district,teacher_address.pincode 
	from classes inner join teacher on classes.teacher_id = teacher.teacher_id
	inner join teacher_address on teacher.address_id = teacher_address.address_id;
