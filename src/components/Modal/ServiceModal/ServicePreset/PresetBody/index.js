import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listClasses } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import styles from './PresetBody.module.scss';
const cx = classNames.bind(styles);

function PresetBody({ data, pricingRules, setPricingRules, count }) {
    const [workTimePopper, setWorkTimePopper] = useState(false);
    const [priceTypePopper, setPriceTypePopper] = useState(false);
    const [duration, setDuration] = useState([]);

    const priceTypes = [
        {
            name: 'Cố định',
            type: 'fixed',
        },
        {
            name: 'Tính từ',
            type: null,
        },
        {
            name: 'Miễn phí',
            type: 'free',
        },
    ];

    const humanizeDuration = require('humanize-duration');
    const serviceInfo = useServiceInfo();

    const createTime = () => {
        if (duration.length < 24) {
            const newTime = Number(duration.slice(duration.length - 1, duration.length)) + 900000;
            setDuration([...duration, newTime]);
        }
    };

    useEffect(() => {
        createTime();
    }, [duration]);

    const handleDelete = () => {
        serviceInfo.handleDeletePricingRules(count);
    };

    const handleSelectWorkTime = (e, time) => {
        serviceInfo.handleSetPricingRules('duration', time, count);
        setWorkTimePopper(false);
    };

    const handleSelectPriceType = (type) => {
        serviceInfo.handleSetPricingRules('price_type', type.type, count);
        setPriceTypePopper(false);
    };

    const handleSetNameType = (e) => {
        serviceInfo.handleSetPricingRules('name', e.target.value, count);
    };

    const handleSetPrice = (e) => {
        serviceInfo.handleSetPricingRules('price', Number(e.target.value), count);
    };

    const handleSetSpecialPrice = (e) => {
        serviceInfo.handleSetPricingRules('special_price', Number(e.target.value), count);
    };

    const handleRender = (type) => {
        switch (type) {
            case null:
                return 'Tính từ';
                break;
            case 'free':
                return 'Miễn phí';
                break;
            default:
                return 'Cố định';
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>{`Lựa chọn mức tiền ${count + 1}`}</h2>
                    {count > 0 && (
                        <span onClick={handleDelete}>
                            <FontAwesomeIcon icon={faClose} className={cx('close-btn')} />
                        </span>
                    )}
                </div>
                <div className={cx('preset-container')}>
                    <div className={cx('preset-item')}>
                        <InputForm
                            whiteBg
                            isButton
                            readOnly
                            value={humanizeDuration(data.duration, { language: 'vi' })}
                            onClick={() => {
                                setWorkTimePopper(!workTimePopper);
                            }}
                            className={cx('input')}
                        >
                            Thời gian làm
                        </InputForm>
                        {workTimePopper && (
                            <Popper className={cx('popper')}>
                                <div className={cx('list')}>
                                    {duration.map((time, i) => {
                                        return (
                                            <div
                                                className={cx('item')}
                                                key={i}
                                                onClick={(e) => handleSelectWorkTime(e, time)}
                                            >
                                                {humanizeDuration(time, { language: 'vi' })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Popper>
                        )}
                    </div>
                    <div className={cx('preset-item')}>
                        <InputForm
                            value={handleRender(data.price_type)}
                            whiteBg
                            isButton
                            readOnly
                            onClick={() => setPriceTypePopper(!priceTypePopper)}
                        >
                            Thể loại giá
                        </InputForm>
                        {priceTypePopper && (
                            <Popper className={cx('popper')}>
                                <div className={cx('list')}>
                                    {priceTypes.map((type, i) => {
                                        return (
                                            <div
                                                className={cx('item')}
                                                key={i}
                                                onClick={() => handleSelectPriceType(type)}
                                            >
                                                {type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Popper>
                        )}
                    </div>
                    <InputForm onChange={handleSetPrice} className={cx('preset-item')} value={data.price}>
                        Thành tiền
                    </InputForm>
                    <InputForm
                        onChange={handleSetSpecialPrice}
                        className={cx('preset-item')}
                        value={data.special_price}
                    >
                        Giá đặc biệt
                    </InputForm>
                    <InputForm
                        onChange={handleSetNameType}
                        value={data.name}
                        className={cx('preset-item', 'preset-type')}
                    >
                        Tên thể loại
                    </InputForm>
                </div>
            </div>
        </div>
    );
}

export default PresetBody;
