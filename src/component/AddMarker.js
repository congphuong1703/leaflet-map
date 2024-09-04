import {Affix, Button, Form, Input, message, Modal, notification, Select, Space} from "antd";
import {EnvironmentOutlined, SaveOutlined, CloseOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useMapEvents} from "react-leaflet";
import {OPTIONS_TYPE_MARKER} from "../Constants";
import {useTranslation} from "react-i18next";

const {Option} = Select
const ModalPropertiesMarker = (props) => {
    const {t, isModalOpen, onSubmit, onCancel, form} = props
    return (
        <Modal title={t('modal.addMarker')}
               forceRender={true}
               open={isModalOpen} onCancel={onCancel}
               footer={[
                   <Space key="space">
                       <Button htmlType="button" icon={<CloseOutlined />}
                               onClick={onCancel}>{t('action.close')}</Button>
                       <Button type="primary"
                               form="form"
                               key="submit"
                               icon={<SaveOutlined />}
                               htmlType="submit">
                           {t('action.save')}
                       </Button>
                   </Space>
               ]}
        >
            <Form onFinish={onSubmit} form={form} name="form" labelAlign="left"
                  labelCol={{span: 8}}>
                <Form.Item name="lat" hidden label={t('form.lat')}>
                    <Input name="lat" placeholder={`${t('form.lat')}`} />
                </Form.Item>
                <Form.Item name="lng" hidden label={t('form.lng')}>
                    <Input name="lng" placeholder={`${t('form.lng')}`} />
                </Form.Item>
                <Form.Item name="typePoint" rules={[
                    {
                        required: true,
                        message: t('message.inputRequire'),
                    }]} label={t('form.typePoint')}>
                    <Select name="typePoint" placeholder={`${t('form.typePoint')}`}>
                        {OPTIONS_TYPE_MARKER.map((ele, index) => {
                            return (<Option key={index} value={ele.value}>{ele.label}</Option>)
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="name" rules={[
                    {
                        whitespace: true,
                        required: true,
                        message: t('message.inputRequire'),
                    }]}
                           label={t('form.name')}>
                    <Input name="name" placeholder={`${t('form.name')}`} />
                </Form.Item>
                <Form.Item name="shortName"
                           rules={[
                               {
                                   whitespace: true,
                                   required: true,
                                   message: t('message.inputRequire'),
                               }]}
                           label={t('form.shortName')}>
                    <Input name="shortName" placeholder={`${t('form.shortName')}`} />
                </Form.Item>
                <Form.Item name="address"
                           label={t('form.address')}>
                    <Input name="address" placeholder={`${t('form.address')}`} />
                </Form.Item>
                <Form.Item name="phoneNumber" rules={[
                    {
                        whitespace: true,
                        required: true,
                        message: t('message.inputRequire'),
                    }]} label={t('form.phoneNumber')}>
                    <Input name="phoneNumber" placeholder={`${t('form.phoneNumber')}`} />
                </Form.Item>
                <Form.Item name="website" label={t('form.website')}>
                    <Input name="website" placeholder={`${t('form.website')}`} />
                </Form.Item>
            </Form>
        </Modal>
    )

}
const AddMarker = (props) => {
    const [isAddMarker, setIsAddMarker] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageApi, contextHolderMessage] = message.useMessage();
    const [notificationApi, contextHolderNotification] = notification.useNotification();
    const [form] = Form.useForm();
    const {t} = useTranslation()
    const {setMarkers} = props
    const onClick = () => {
        messageApi.info(!isAddMarker ? t('action.activeAddMarker') : t('action.inactiveAddMarker'), 10);
        setIsAddMarker(!isAddMarker)
    }

    const onSubmitModal = (data) => {
        setMarkers((current) => [
            ...current,
            {
                geometry: {
                    coordinates: [data.lat, data.lng],
                    type: "Point"
                },
                properties: {
                    name: data.name,
                    shortName: data.shortName,
                    phoneNumber: data.phoneNumber,
                    website: data.website,
                    address: data.address,
                },
                type: data.typePoint
            },
        ]);
        setIsOpenModal(false)
        form.resetFields()
        notificationApi.success({
            message: t('notification.success'),
            description: t('message.addSuccess')
        })
    }

    const onCancelModal = () => {
        setIsOpenModal(false)
        form.resetFields()
    }

    const AddMarkerOnClick = () => {
        useMapEvents({
            click(e) {
                const {lat, lng} = e.latlng;
                if (isAddMarker) {
                    form.setFieldsValue({
                        'lat': lat,
                        'lng': lng,
                    })
                    setIsOpenModal(!isOpenModal)
                }
            },
        });
        return null
    };
    return (
        <>
            {contextHolderMessage}
            {contextHolderNotification}
            <Affix offsetTop={100} className="container-searching">
                <Button icon={<EnvironmentOutlined />} title="Thêm điểm" className="btn-list btn-border"
                        onClick={onClick} />
            </Affix>
            <AddMarkerOnClick isAdd={isAddMarker} />
            <ModalPropertiesMarker isModalOpen={isOpenModal} t={t} onSubmit={onSubmitModal} form={form}
                                   onCancel={onCancelModal} />
        </>
    )
}

export default AddMarker