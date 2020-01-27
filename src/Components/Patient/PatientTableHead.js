import React, { Component } from 'react';
import { Input, Icon} from'antd';
import TableHeadStyleWrapper from './TableHeadSection.style'

const Search = Input.Search;

class PatientTableHead extends Component {
    render() {
        return (
            <TableHeadStyleWrapper>
            <div className="table-head-section">
                    <div className="table-head-left-item">
                        <div className="table-title">{this.props.tableTitle}</div>
                    </div>
                    <div className="table-head-right-item">
                        <div id="create-supplier" onClick={() => this.props.showCreatePatienthandler()}><a href="javascript:;"><Icon type="plus"/></a></div>
                        <div>  
                        <Search
                        placeholder="search table"
                        onSearch={(value) => this.props.searchClicked(value, this.props.tableData)}
                        enterButton={true}
                        allowClear={true}
                        style={{ width: 200 }}
                        />      
                        </div>
                    </div>  
                </div>
            </TableHeadStyleWrapper>
        );
    }
}

export default PatientTableHead;