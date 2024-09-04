import {Descriptions, Drawer, Image, Typography} from "antd";
import {BankOutlined, FullscreenExitOutlined, GlobalOutlined, PhoneOutlined} from "@ant-design/icons";
import React from "react";

const DrawerSidebar = (props) => {
    const {
        onDirection,
        properties,
        setActiveMarker,
        activeMarker
    } = props
    return (
        <Drawer title={properties?.name}
                placement='left'
                onClose={() => setActiveMarker(null)} open={activeMarker}>
            <Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            <Descriptions title={properties?.name + " - " + properties?.shortName}
                          layout="horizontal"
                          size="middle"
                          column={1}>
                <Descriptions.Item
                    label={<BankOutlined />}>{properties?.address}</Descriptions.Item>
                <Descriptions.Item
                    label={<PhoneOutlined />}>{properties?.phoneNumber}</Descriptions.Item>
                <Descriptions.Item
                    label={<GlobalOutlined />}>{properties?.website}</Descriptions.Item>
                <Descriptions.Item style={{cursor: 'pointer'}}
                                   label={<FullscreenExitOutlined />}>
                    <Typography.Text onClick={onDirection}>
                        Chỉ đường đi
                    </Typography.Text>
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}
export default DrawerSidebar