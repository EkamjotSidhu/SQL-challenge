INSERT INTO department(id, name)
VALUES(1,"Design"),
(2,"Production"),
(3,"Quality"),
(4,"Sales");
INSERT INTO role(id, title,salary,department_id)
VALUES(1,"Technician",40000.00,2),
(2,"Engineer",80000.00,1),
(3,"Sales Tech",60000.00,4),
(4,"Inspector",70000.00,3);
SET FOREIGN_KEY_CHECKS=0;
INSERT INTO employee(id, first_name,last_name,role_id,manager_id)
VALUES(1,"John","Rambo",2,null),
(2,"Jane","Doe",3,null),
(3,"Greg","Maloy",1,4),
(4,"Matt","Murdock",4,2);
SET FOREIGN_KEY_CHECKS=1;