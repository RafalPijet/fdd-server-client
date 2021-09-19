import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import HeartIconItem from '../../common/HeartIconItem/HeartIconItem';
import Footer from '../../common/Footer/Footer';
import CustomButton from '../../common/CustomButton/CustomButton';
import {getChildrenList} from '../../../redux/actions/generalActions';
import {ChildBasicState} from '../../../types/global';
import {useStyles, payValues} from './DonatePageStyle';
import axios, {AxiosResponse} from 'axios';
import {
    setUserToast
} from '../../../redux/actions/generalActions';
import { VariantType, useSnackbar } from 'notistack';

const DonatePage: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const children = useSelector(getChildrenList);
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState<number>(100);
    const [isOtherQuota, setIsOtherQuota] = useState<boolean>(false);
    const [childId, setChildId] = useState<string>('');
    const [selectedChild, setSelectedChild] = useState<ChildBasicState | null>(
        null
    );
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (window.location.hash == "#success") {
            // dispatch(
            //     setUserToast({
            //         isOpen: true,
            //         content: 'Dziękujemy za wpłatę.',
            //         variant: 'success',
            //     })
            // );

            enqueueSnackbar('Dziękujemy za wpłatę.', { variant: 'success' });
        } else if (window.location.hash == "#fail") {
            // dispatch(
            //     setUserToast({
            //         isOpen: true,
            //         content: 'Płatność  nie powiodła się, prosimy spróbować ponownie.',
            //         variant: 'error',
            //     })
            // );

            enqueueSnackbar('Płatność  nie powiodła się, prosimy spróbować ponownie.', { variant: 'error' });
        }

        setChildId(
            location.pathname.substring(
                location.pathname.lastIndexOf('/') + 1,
                location.pathname.length
            )
        );
    }, []);

    useEffect(() => {
        if (children !== null) {
            const findedChild = children.find((child) => child._id === childId);
            if (findedChild) setSelectedChild(findedChild);
        }
    }, [childId]);

    const getValueHandling = (value: number) => {
        if (payValues.includes(value)) {
            setSelectedValue(value);
            if (isOtherQuota) {
                setIsOtherQuota(false);
            }
        } else {
            setSelectedValue(value);
            setIsOtherQuota(true);
        }
    };

    const handleValueField = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSelectedValue(+event.target.value);
    };

    const handleSendButton = async () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/payments/checkout/session/${selectedValue}`;
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement | HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            handleSendButton();
        }
    };

    return (
        <div>
            <Header
                fixed
                color="transparent"
                brand="Fundacja Dorośli Dzieciom"
                rightLinks={<HeaderLinks/>}
                changeColorOnScroll={{
                    height: 150,
                    color: 'white',
                }}
            />
            <div className={classes.pageHeader}>
                <div className={classes.container}>
                    <Typography variant="h4" className={classes.titlePage}>
                        Przekaż datek
                    </Typography>
                </div>
            </div>
            <div className={ClassNames(classes.main, classes.mainRaised)}>
                <GridContainer justify="center" alignContent="flex-start">
                    <GridItem xs={12} sm={12} md={8}>
                        <Paper elevation={3} className={classes.root}>
                            {childId === '0' && (
                                <Typography variant="h6" align="center">
                                    W imieniu podopiecznych Fundacji DOROŚLI DZIECIOM zachęcamy
                                    wszystkich tych z Państwa, którzy rozumieją naszą misję i chcą
                                    w niej uczestniczyć, o przekazanie określonej darowizny na
                                    nasze cele statutowe.
                                </Typography>
                            )}
                            {selectedChild !== null && childId !== '0' && (
                                <div className={classes.childRow}>
                                    <Avatar
                                        variant="rounded"
                                        src={selectedChild.avatar}
                                        alt={`${selectedChild.name}`}
                                        className={classes.avatar}
                                    />
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        className={classes.childName}
                                    >
                                        {selectedChild.name}
                                    </Typography>
                                </div>
                            )}
                            <Typography variant="h5" align="center" className={classes.title}>
                                Wybierz kwotę darowizny
                            </Typography>
                            <GridContainer
                                style={{display: 'flex', justifyContent: 'center'}}
                            >
                                <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {payValues.map((value: number) => {
                                        return (
                                            <HeartIconItem
                                                key={value}
                                                value={value}
                                                selectedValue={selectedValue}
                                                getSelectedValue={getValueHandling}
                                            />
                                        );
                                    })}
                                    <HeartIconItem
                                        selectedValue={selectedValue}
                                        value={selectedValue}
                                        isOther
                                        getSelectedValue={getValueHandling}
                                    />
                                </GridItem>
                                <GridItem
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <TextField
                                        id="donate-quota"
                                        label={isOtherQuota ? 'Wprowadź kwotę' : 'Wybrana kwota'}
                                        variant="outlined"
                                        type="number"
                                        value={selectedValue}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            autoFocus: true,
                                        }}
                                        onChange={handleValueField}
                                        disabled={!isOtherQuota}
                                        classes={{
                                            root: classes.valueField,
                                        }}
                                        focused={isOtherQuota}
                                    />
                                    <CustomButton
                                        onClick={handleSendButton}
                                        onKeyDown={onKeyDown}
                                        disabled={selectedValue < 10}
                                        setColor="primary"
                                        setSize="lg"
                                    >
                                        Wpłać darowiznę
                                    </CustomButton>
                                </GridItem>
                            </GridContainer>
                        </Paper>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer/>
        </div>
    );
};

export default DonatePage;
