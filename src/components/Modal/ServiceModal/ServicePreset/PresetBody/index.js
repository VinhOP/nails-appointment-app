import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listClasses } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks';
import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import styles from './PresetBody.module.scss';
const cx = classNames.bind(styles);

function PresetBody({ data, pricingRules, setPricingRules, count }) {
    const [workTimePopper, setWorkTimePopper] = useState(false);
    const [priceTypePopper, setPriceTypePopper] = useState(false);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState([]);
    const [priceTypes, setPriceType] = useState(['Cố định', 'Tính từ', 'Miễn phí']);

    const humanizeDuration = require('humanize-duration');
    const debouncedValue = useDebounce(name, 500);

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
        const newArr = pricingRules.filter((preset, i) => i !== count);
        setPricingRules(newArr);
    };

    const handleSelectWorkTime = (e) => {
        setPricingRules([
            ...pricingRules.slice(0, count),
            { ...pricingRules[count], work_time: e.target.innerText },
            ...pricingRules.slice(count + 1),
        ]);
        setWorkTimePopper(false);
    };

    const handleSelectPriceType = (e) => {
        setPricingRules([
            ...pricingRules.slice(0, count),
            { ...pricingRules[count], price_type: e.target.innerText },
            ...pricingRules.slice(count + 1),
        ]);
        setPriceTypePopper(false);
    };

    const handleSetNameType = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        setPricingRules([
            ...pricingRules.slice(0, count),
            { ...pricingRules[count], name: debouncedValue },
            ...pricingRules.slice(count + 1),
        ]);
    }, [debouncedValue]);

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
                            value={data.work_time}
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
                                            <div className={cx('item')} key={i} onClick={handleSelectWorkTime}>
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
                            value={data.price_type}
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
                                            <div className={cx('item')} key={i} onClick={handleSelectPriceType}>
                                                {type}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Popper>
                        )}
                    </div>
                    <InputForm className={cx('preset-item')} value={data.price}>
                        Thành tiền
                    </InputForm>
                    <InputForm className={cx('preset-item')} value={data.special_price}>
                        Giá đặc biệt
                    </InputForm>
                    <InputForm onChange={handleSetNameType} value={name} className={cx('preset-item', 'preset-type')}>
                        Tên thể loại
                    </InputForm>
                </div>
            </div>
        </div>
    );
}

export default PresetBody;
