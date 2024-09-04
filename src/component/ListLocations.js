import {Affix, Button, Collapse, List, Modal, Typography} from "antd";
import React, {useState} from "react";
import parkData from "../data/data.json";
import {MenuOutlined} from "@ant-design/icons";

const groupedData = parkData.features.reduce((acc, curr) => {
    if (!acc[curr.type]) {
        acc[curr.type] = [curr];
    } else {
        acc[curr.type].push(curr);
    }
    return acc;
}, {});

const ListLocations = (props) => {

    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const {setActiveMarker, setCoordinateCenter} = props
    const onClick = (item) => {
        setIsOpenInfo(false)
        setActiveMarker(item)
        setCoordinateCenter([
            item.geometry.coordinates[0],
            item.geometry.coordinates[1]]
        )

    }

    return (
        <>
            <Affix offsetTop={100} className="container-searching">
                <Button icon={<MenuOutlined />} className="btn-list btn-border" onClick={() => setIsOpenInfo(true)}
                        title="Thông tin"></Button>
            </Affix>
            <Modal
                width={700}
                open={isOpenInfo}
                onOk={() => setIsOpenInfo(false)}
                onCancel={() => setIsOpenInfo(false)}
                title="Danh sách địa điểm">
                <div style={{maxHeight: 800, overflow: "auto"}}>
                    {Object.keys(groupedData).map((key, index) => {
                        return (<Collapse
                            style={{marginBottom: 5}}
                            bordered
                            key={index}
                            defaultActiveKey={[index]}
                            items={[
                                {
                                    key: index,
                                    label: key,
                                    children: <List
                                        bordered
                                        dataSource={groupedData[key]}
                                        renderItem={(item) => {
                                            return (
                                                <List.Item style={{cursor: 'pointer'}}>
                                                    <Typography.Text onClick={() => {
                                                        onClick(item)
                                                    }}>
                                                        {item.properties.shortName} - {item.properties.name}
                                                    </Typography.Text>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                },
                            ]}
                        />)
                    })}
                </div>
            </Modal>
        </>
    )
}
export default ListLocations