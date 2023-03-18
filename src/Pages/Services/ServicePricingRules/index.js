import classNames from 'classnames/bind';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import { useServiceInfo } from '../../../Contexts/ServiceInfoContext';
import styles from './ServicePricingRules.module.scss';

const cx = classNames.bind(styles);

function ServicePricingRules({ service, modal, setModal, setIsEditModal }) {
    const humanizeDuration = require('humanize-duration');
    const serviceInfo = useServiceInfo();

    const handleOpenModal = () => {
        serviceInfo.setServiceFields({
            ...serviceInfo.serviceFields,
            id: service.id || '',
            name: service.name || '',
            category_id: service.category_id || '',
            description: service.description || '',
            service_available_for: service.service_available_for,
            enabled_online_booking: service.enabled_online_booking,
            service_pricing_rules: service.service_pricing_rules.map((rule) => {
                return { ...rule, duration: rule.duration * 60 * 1000 };
            }),
            staffs: service.staffs.map((staff) => {
                return {
                    partner_id: staff.id,
                };
            }),
        });
        setIsEditModal(true);
        setModal(true);
    };

    return (
        <div key={service.id} className={cx('wrapper')} onClick={handleOpenModal}>
            <div className={cx('title')}>{service.name}</div>
            <ul className={cx('rules-list')}>
                {service.service_pricing_rules.map((rule) => {
                    return (
                        <div className={cx('rule')} key={rule.id}>
                            <div className={cx('rule-name')}>{rule.name}</div>
                            <div className={cx('rule-duration')}>
                                {humanizeDuration(rule.duration * 60 * 1000, {
                                    language: 'vi',
                                })}
                            </div>
                            <div className={cx('rule-price', { disabled: !!rule.special_price })}>{rule.price}$</div>
                            {!!rule.special_price && (
                                <div className={cx('rule-special-price')}>{rule.special_price}$</div>
                            )}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default ServicePricingRules;
