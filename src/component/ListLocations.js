import {Affix, Button, Collapse, List, Modal, Typography} from "antd";
import React, {useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import {OPTIONS_TYPE_MARKER} from "../Constants";


const ListLocations = (props) => {

    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const {setActiveMarker, markers, setCoordinateCenter} = props

    const groupedData = markers.reduce((acc, curr) => {
        console.log("curr", curr, acc)
        const type = OPTIONS_TYPE_MARKER.find(e => e.value === curr.type).label
        if (!acc[type]) {
            acc[type] = [curr];
        } else {
            acc[type].push(curr);
        }
        return acc;
    }, {});
    console.log("groupedData", groupedData)
    const onClick = (item) => {
        setIsOpenInfo(false)
        setActiveMarker(item)
        setCoordinateCenter([
            item.geometry.coordinates[0],
            item.geometry.coordinates[1]]
        )

    }
    console.log("key", groupedData)
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
                    {Object.keys(markers).map((key, index) => {
                        const label = OPTIONS_TYPE_MARKER.find(e => e.value === markers[key].type).label
                        return (<Collapse
                            style={{marginBottom: 5}}
                            bordered
                            key={index}
                            defaultActiveKey={[index]}
                            items={[
                                {
                                    key: index,
                                    label: label,
                                    children: <List
                                        bordered
                                        dataSource={groupedData[label]}
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