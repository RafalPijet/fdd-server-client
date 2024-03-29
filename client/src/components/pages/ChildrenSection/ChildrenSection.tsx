import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import UIfx from 'uifx';
import Grow from '@material-ui/core/Grow';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import Footer from '../../common/Footer/Footer';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ChildItem from '../../common/ChildItem/ChildItem';
import ChildPresentation from '../../features/ChildPresentation/ChildPresentation';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import {
  getChildrenList,
  getSelectedPerson,
  getSelectedChild,
  setSelectedPerson,
  setSelectedChild,
  getSelectedQuantity,
} from '../../../redux/actions/generalActions';
import {
  getUpdating,
  getUpdatingSuccess,
} from '../../../redux/actions/requestActions';
import { ChildBasicState, CssTextField } from '../../../types/global';
import {
  getChildByIdRequest,
  getChildrenBasicDataRequest,
} from '../../../redux/thunks';
import childVoiceSound from '../../../sounds/childVoice.mp3';
import { useStyles, dummyData, SelectedChild } from './ChildrenSectionStyle';

const ChildrenSection: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const childrenList = useSelector(getChildrenList);
  const selectedPerson = useSelector(getSelectedPerson);
  const selectedId = useSelector(getSelectedChild);
  const isUpdating = useSelector(getUpdating);
  const isSuccess = useSelector(getUpdatingSuccess);
  const quantity = useSelector(getSelectedQuantity);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isListReady, setIsListReady] = useState<boolean>(false);
  const [childId, setChildId] = useState<string | null>(selectedId);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(12);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedChildName, setSelectedChildName] =
    useState<SelectedChild | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loading = open && options.length === 0;
  const childVoice = new UIfx(childVoiceSound);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(true);
    };
    window.scrollTo(0, 0);
    return () => {
      dispatch(setSelectedChild(null));
      dispatch(setSelectedPerson(null));
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      childVoice.play(0.5);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (selectedId !== childId) {
      setChildId(selectedId);
      setIsReady(false);
    }
  }, [childId, selectedId]);

  useEffect(() => {
    setIsListReady(false);
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (
      !isListReady &&
      selectedChildName === null &&
      childId !== null &&
      childrenList !== null &&
      childrenList.length
    ) {
      setIsReady(false);
      setIsListReady(true);
    }
    if (isListReady && selectedChildName !== null) {
      setIsListReady(false);
    }
  }, [selectedChildName]);

  useEffect(() => {
    if (childrenList !== null) {
      dispatch(getChildByIdRequest(childrenList[0]._id));
    } else {
      dispatch(getChildrenBasicDataRequest(page, rowsPerPage));
    }
  }, [childrenList]);

  useEffect(() => {
    if (selectedPerson !== null && !isUpdating && isListReady) {
      setIsReady(true);
    }
    if (selectedPerson !== null && !isUpdating && selectedChildName !== null) {
      setIsReady(true);
    }
  }, [selectedPerson, isUpdating, selectedChildName]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/children/names`
        );
        const names = res.data.names;

        if (active && names) {
          setOptions(names);
        }
      } catch (err) {
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (childrenList !== null && !isUpdating && selectedChildName === null) {
      setIsListReady(childrenList.length > 0);
    }
  }, [childrenList, isUpdating]);

  const changeChildHandling = () => {
    dispatch(setSelectedPerson(null));
    if (selectedId !== null && selectedChildName === null && !isSearchMode) {
      dispatch(getChildByIdRequest(selectedId));
    }
    if (selectedChildName !== null) {
      dispatch(getChildByIdRequest(selectedChildName._id));
      setIsSearchMode(true);
    }
    if (selectedChildName === null && isSearchMode && childrenList) {
      dispatch(getChildByIdRequest(childrenList[0]._id));
      setIsSearchMode(false);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectedItemHandling = (
    e: React.ChangeEvent<{}>,
    value: SelectedChild | null
  ) => {
    setSelectedChildName(value);
  };

  return (
    <div>
      <Header
        isSpiner={isUpdating}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isUpdating} />}
        changeColorOnScroll={{
          height: 150,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Podopieczni
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer
          justify="center"
          style={{ paddingBottom: '20px' }}
          alignContent="flex-start"
        >
          <GridItem xs={12} sm={12} md={10} style={{ minHeight: '690px' }}>
            <Grow
              in={isReady}
              unmountOnExit={true}
              onExited={changeChildHandling}
              {...(isReady ? { timeout: 1000 } : {})}
            >
              <div>
                <ChildPresentation
                  selectedChild={
                    selectedPerson !== null ? selectedPerson : dummyData
                  }
                />
              </div>
            </Grow>
          </GridItem>
          <GridItem xs={10} sm={10} md={10}>
            <Fade
              in={isListReady}
              timeout={1000}
              onExited={() => {
                if (selectedChildName === null) {
                  dispatch(getChildrenBasicDataRequest(page, rowsPerPage));
                }
                setIsReady(false);
              }}
            >
              <GridContainer
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  height: !isListReady && isUpdating ? 0 : 200,
                  overflow: 'auto',
                }}
                justify={
                  childrenList !== null && childrenList.length < 6
                    ? 'center'
                    : 'space-between'
                }
                alignItems="center"
              >
                {childrenList !== null && selectedChildName === null ? ( //change
                  childrenList.map((child: ChildBasicState) => (
                    <ChildItem key={child._id} childItem={child} />
                  ))
                ) : (
                  <div className={classes.waiting}>
                    <Typography style={{ color: '#fff' }}>
                      Brak podopiecznych...
                    </Typography>
                  </div>
                )}
              </GridContainer>
            </Fade>
            {!isListReady && isUpdating && (
              <div className={classes.waiting}>
                <Typography style={{ color: '#fff' }}>
                  Wczytywanie...
                </Typography>
              </div>
            )}
          </GridItem>
          <GridItem xs={10} sm={10} md={8}>
            <Paper elevation={10} className={classes.footerOperations}>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <CustomPagination
                    rowsPerPageOptions={[12, 24, 36]}
                    isHidden={selectedChildName !== null}
                    quantity={quantity !== null ? quantity : 0}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    label="Ilość podopiecznych"
                    isPending={isUpdating}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Autocomplete
                    style={{ width: '70%' }}
                    disabled={isUpdating}
                    id="children-searcher"
                    open={open}
                    size="medium"
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    value={selectedChildName}
                    clearText="Usuń wybór"
                    noOptionsText="Nie znaleziono"
                    loadingText="Czekaj..."
                    onChange={selectedItemHandling}
                    getOptionSelected={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                      <CssTextField
                        {...params}
                        label="Wyszukaj podopiecznego..."
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress
                                  style={{ color: '#fff' }}
                                  color="inherit"
                                  size={20}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </GridItem>
              </GridContainer>
            </Paper>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

export default ChildrenSection;
