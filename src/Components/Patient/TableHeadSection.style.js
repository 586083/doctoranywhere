import styled from "styled-components";
const TableHeadStyleWrapper = styled.div`

    .table-head-section{
        display: flex;
        justify-content: space-between;
        min-height: 50px;
    }
    .rule-head-section{
        background-color: white;
    }
    .table-title{
        font-size: 20px;
        font-weight: bold;
        color : #00256B;
        padding: 8px 16px;
    }
   
    .table-head-right-item{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
    }
    .table-head-right-item div{
        margin-left : 10px;
    }    
    .table-head-left-item{
        display: flex;
        align-items: center;
    }
    .ant-input-search-button.ant-btn-primary{
        color: #fff;
        background-color: #00256B;
        border-color: #00256B;
    }
    .hide
    {
        display:none;
    }
`;

export default TableHeadStyleWrapper;