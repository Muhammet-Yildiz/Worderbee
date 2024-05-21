import {
    JetBrains_Mono as FontMono,
    Plus_Jakarta_Sans as FontSans,
    Nunito,
    Tilt_Warp as TiltWrap
} from "next/font/google"

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const nunito = Nunito({
    subsets: ['latin']
})

export const tiltWarp = TiltWrap({
    subsets: ['latin']
})