export interface CountryCode {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { name: 'United Kingdom', code: 'GB', dial_code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: 'US', dial_code: '+1', flag: '🇺🇸' },
  { name: 'Germany', code: 'DE', dial_code: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial_code: '+33', flag: '🇫🇷' },
  { name: 'Spain', code: 'ES', dial_code: '+34', flag: '🇪🇸' },
  { name: 'Italy', code: 'IT', dial_code: '+39', flag: '🇮🇹' },
  { name: 'Netherlands', code: 'NL', dial_code: '+31', flag: '🇳🇱' },
  { name: 'Belgium', code: 'BE', dial_code: '+32', flag: '🇧🇪' },
  { name: 'Poland', code: 'PL', dial_code: '+48', flag: '🇵🇱' },
  { name: 'Sweden', code: 'SE', dial_code: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', dial_code: '+47', flag: '🇳🇴' },
  { name: 'Denmark', code: 'DK', dial_code: '+45', flag: '🇩🇰' },
  { name: 'Finland', code: 'FI', dial_code: '+358', flag: '🇫🇮' },
  { name: 'Austria', code: 'AT', dial_code: '+43', flag: '🇦🇹' },
  { name: 'Switzerland', code: 'CH', dial_code: '+41', flag: '🇨🇭' },
  { name: 'Ireland', code: 'IE', dial_code: '+353', flag: '🇮🇪' },
  { name: 'Portugal', code: 'PT', dial_code: '+351', flag: '🇵🇹' },
  { name: 'Greece', code: 'GR', dial_code: '+30', flag: '🇬🇷' },
  { name: 'Czech Republic', code: 'CZ', dial_code: '+420', flag: '🇨🇿' },
  { name: 'Hungary', code: 'HU', dial_code: '+36', flag: '🇭🇺' },
  { name: 'Romania', code: 'RO', dial_code: '+40', flag: '🇷🇴' },
  { name: 'Bulgaria', code: 'BG', dial_code: '+359', flag: '🇧🇬' },
  { name: 'Croatia', code: 'HR', dial_code: '+385', flag: '🇭🇷' },
  { name: 'Slovakia', code: 'SK', dial_code: '+421', flag: '🇸🇰' },
  { name: 'Slovenia', code: 'SI', dial_code: '+386', flag: '🇸🇮' },
  { name: 'Estonia', code: 'EE', dial_code: '+372', flag: '🇪🇪' },
  { name: 'Latvia', code: 'LV', dial_code: '+371', flag: '🇱🇻' },
  { name: 'Lithuania', code: 'LT', dial_code: '+370', flag: '🇱🇹' },
  { name: 'Iceland', code: 'IS', dial_code: '+354', flag: '🇮🇸' },
  { name: 'Luxembourg', code: 'LU', dial_code: '+352', flag: '🇱🇺' }
].sort((a, b) => a.name.localeCompare(b.name));