import CardStyles from '../../styles/dark/Card.module.css'
import ControlStyles from '../../styles/dark/Control.module.css'
import ControlContentStyles from '../../styles/dark/ControlContent.module.css'
import CurrentStateStyles from '../../styles/dark/Current-state.module.css'
import CurrentStateContentStyles from '../../styles/dark/CurrentStateContent.module.css'
import DrawerStyles from '../../styles/dark/Drawer.module.css'
import LayoutStyles from '../../styles/dark/layout.module.css'
import LoginStyles from '../../styles/dark/Login.module.css'
import SettingStyles from '../../styles/dark/Setting.module.css'
import StatisticStyles from '../../styles/dark/Statistic.module.css'
import StatisticContentStyles from '../../styles/dark/StatisticContent.module.css'
import adminStyles from '../../styles/dark/Admin.module.css'

export default function () {
  return {
    card: CardStyles,
    control: ControlStyles,
    controlContent: ControlContentStyles,
    currentState: CurrentStateStyles,
    currentStateContent: CurrentStateContentStyles,
    drawer: DrawerStyles,
    layout: LayoutStyles,
    login: LoginStyles,
    setting: SettingStyles,
    statistic: StatisticStyles,
    statisticContent: StatisticContentStyles,
    admin: adminStyles
  }
}