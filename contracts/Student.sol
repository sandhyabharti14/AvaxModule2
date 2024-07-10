// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract Student{


    struct NewStudent{
        string name;
        uint id;
        address studentAddress;
    }

    NewStudent[] public studentDetails;
    mapping(address => uint[]) public studentMarks;


    constructor(){

    }
// renamt this file to Student.sol



    function registerNewStudent(string memory _name, uint id, address _sad)external{
        studentDetails.push(NewStudent(_name,id,_sad));
    }

    function addStudentMarks(address _saddress , uint _m1) external{
        studentMarks[_saddress].push(_m1);
    }

    function getStudents() external view returns(NewStudent[] memory){
        return studentDetails;
    }

    function getMarks(address _Saddress) external view returns(uint[] memory){
        return studentMarks[_Saddress];
    }


}