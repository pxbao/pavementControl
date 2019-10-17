import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import './login.css'

//conf
import { ROUTE_MAP } from '../../constants/routeConf'

//action
import { login } from '../../actions/userAction'

//utiils
import Toast from '../../utils/Toast'
import Loading from '../../utils/Loading'

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    dispatchLogin: (...args) => dispatch(login(...args))
})
const logoImage = require('../../assets/img/login_bg.png')

@connect(mapStateToProps, mapDispatchToProps)

export default class Login extends Component {
    static propTypes = {
        dispatchLogin: PropTypes.func.isRequired
    }
    config = {
        navigationBarTitleText: '登录'
    }

    state = {
        phoneNumber: '15068773833',
        password: ''
    }

    validateLogin() {
        const { phoneNumber } = this.state;
        let ret = '';
        if (!phoneNumber) {
            ret = '请输入手机号!';
        }
        if (ret) {
            Toast.showToast(ret);
            return false;
        }
        return true;
    }

    handleLogiin = async () => {
        if (this.validateLogin) {
            return;
        }
        const { dispatchLogin } = this.props;
        const { phoneNumber, password } = this.state;

        try {
            Loading.showMaskLoading('登录中...');
            await dispatchLogin(phoneNumber, password);
            Loading.hideLoading();
            if (this.$router.params.isBackToLastPage === 'YES') {
                Taro.navigateBack();
            } else {
                Taro.redirectTo({
                    url: ROUTE_MAP.login
                });
            }
        } catch (e) {
            console.warn(e);
            Toast.showErrorToast(e, '登录失败');
        }
    }

    onChangePhoneNumber = (phoneNumber) => {
        this.setState({
            phoneNumber
        });
    }
    onChangePassword = (password) => {
        this.setState({
            password
        });
    };
    renderLogo() {
        return (
            <View className='logo-icon-content'>
                <Image src={logoImage} className='logo-icon'/>
                <Text className='login-title'>路面管控</Text>
            </View>

        );
    }

    renderLoginForm() {
        const { phoneNumber, password } = this.state;
        return (
            <AtForm className='login-form'>
                <AtInput
                    name='phoneNumber'
                    placeholder='手机号'
                    type='phone'
                    value={phoneNumber}
                    clear
                    onchange={this.onChangePhoneNumber}
                />
                <AtInput
                    name='password'
                    placeholder='密码'
                    type='password'
                    value={password}
                    clear
                    onChange={this.onChangePassword}
                />
            </AtForm>
        );
    }
    // componentWillMount() { }
    // componentDidMount() { }
    // componentWillUnmount() { }
    // componentDidShow() { }
    // componentDidHide() { }

    render() {
        return (
            <View className='login-wrapper'>
                {this.renderLogo()}
                {this.renderLoginForm()}
                <AtButton
                    className='login-form-btn'
                    type='primary'
                    onClick={() => this.onClickLogin(1)}
                >
                    登录
            </AtButton>

            </View>
        )
    }
}