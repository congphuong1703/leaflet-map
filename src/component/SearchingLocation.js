import {Affix, Button, Select, Space, Tooltip, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import parkData from "../data/data.json";


const SearchingLocation = (props) => {
    const {isSearch, setIsSearch, markers, onSearch} = props

    const searchOptions = markers.map((ele) => {
        return {
            label: ele.properties.shortName + " - " + ele.properties.name,
            value: ele.properties.id
        }
    })
    return (
        <Affix className="container-searching content">
            <Space>
                <Button icon={<SearchOutlined />} title="Tìm kiếm" className="btn-list btn-border"
                        onClick={() => setIsSearch(!isSearch)} />
                <Select className="btn-text" placeholder="Tìm kiếm"
                        options={searchOptions}
                        allowClear
                        filterOption={(input, option) => {
                            return input && option.label.toUpperCase().includes(input.toUpperCase())
                        }}
                        optionRender={(option, index) => {
                            return (
                                <Tooltip key={index} title={option.label}>
                                    <Typography.Text>{option.label}</Typography.Text>
                                </Tooltip>
                            )
                        }}
                        onSelect={(e) => onSearch(e)}
                        style={{width: 200, display: isSearch ? 'block' : 'none'}}
                        showSearch />
            </Space>
        </Affix>
    )
}

export default SearchingLocation