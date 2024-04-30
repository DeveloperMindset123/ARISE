import { ReactNode, useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Login } from "../login"

const APP_NAME = `ARISE My Manhwa`
const APP_DOMAIN = `aicomicfactory.app`
const APP_URL = `https://aicomicfactory.app`
const APP_VERSION = `1.0`
const APP_RELEASE_DATE = `April 2024`

const ExternalLink = ({ url, children }: { url: string; children: ReactNode }) => {
  return (
  <a
    className="text-stone-600 underline"
    href={url}
    target="_blank">{children}</a>
  )
}

export function About() {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="hidden md:inline">{APP_NAME.replaceAll(" ", "-")} {APP_VERSION}</span>
          <span className="inline md:hidden">Version {APP_VERSION}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[500px] md:max-w-[600px] overflow-y-scroll h-[100vh] sm:h-[550px]">
        <DialogHeader>
          <DialogDescription className="w-full text-center text-2xl font-bold text-stone-700">
          <ExternalLink url={APP_URL}>{APP_DOMAIN}</ExternalLink> {APP_VERSION} ({APP_RELEASE_DATE})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-stone-700 text-sm md:text-base xl:text-lg">
          <p className="">
            {APP_DOMAIN} generates stories using AI in a few clicks.
          </p>
          <p>
           App is free for Hugging Face users 👉 <Login />
          </p>
          <p>
          👉 Default AI model used for stories is <a className="text-stone-600 underline" href="https://huggingface.co/HuggingFaceH4/zephyr-7b-beta" target="_blank">Zephyr-7b-beta</a>
          </p>
          <p>
          👉 Default AI model used for drawing is <a className="text-stone-600 underline" href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0" target="_blank">SDXL</a> by Stability AI
          </p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}