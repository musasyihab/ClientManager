import { Fonts, Metrics, Colors } from '../../Themes/'

export default {
  button: (isRounded, disabled, backgroundColor) => ({
    borderRadius: isRounded ? 5 : 0,
    padding: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    backgroundColor: disabled ? Colors.lightGrey : backgroundColor,
    justifyContent: 'center'
  }),
  buttonText: textColor => ({
    color: textColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium
  })
}
