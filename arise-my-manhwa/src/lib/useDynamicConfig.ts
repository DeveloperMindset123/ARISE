"use client"

import { useEffect, useState, useTransition } from "react";
import { getDynamicConfig } from "@/app/queries/getDynamicConfig";
import { DynamicConfig } from "@/types";
import { getDefaultDynamicConfig } from "./getDefaultDynamicConfig";

export function useDynamicConfig() : {
    /**This function returns 2 things, config (which is of type DynamicConfig) and isConfigReady (which is of type boolean) */
    config : DynamicConfig;
    isConfigReady : boolean;
} {
    const [_isPending, startTransition] = useTransition();
    const [config, setConfig ] = useState<DynamicConfig>(getDefaultDynamicConfig())
    const [isConfigReady, setConfigReady] = useState(false);

    useEffect(() => {
        startTransition(async () => {
            if (isConfigReady) {
                return
            }
            const newConfig = await getDynamicConfig()
            setConfig(newConfig)
            setConfigReady(true)
        })
    }, [isConfigReady]);

    return {
        config,
        isConfigReady
    }
}
