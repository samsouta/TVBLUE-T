import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { homePageType } from '../../../data/homePageType';
import { StateContext } from '../../../context/StateContext';

const HomePageType: React.FC = () => {
    const [todayVideosCount, setTodayVideosCount] = useState(0);

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { typePage, setTypePage } = context;

    return (
        <div className="flex w-full flex-col">
            <Tabs size="lg" aria-label="Options"
                selectedKey={typePage}
                onSelectionChange={(key) => setTypePage(String(key))}
                items={homePageType}
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[var(--dark-blue)]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[var(--dark-blue)]"
                }}

            >
                {(item) => (
                    <Tab
                        key={item.path}
                        title={
                            <div className="flex items-center space-x-2">
                                <item.icon />
                                <span>{item?.path}</span>
                                {item.path === "Video" && todayVideosCount > 0 && (
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: [-5, 0, -5] }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <Chip
                                            size="sm"
                                            className="border-0 text-[#c3c6c3] bg-transparent"
                                            variant="faded"
                                        >
                                            {todayVideosCount}
                                        </Chip>
                                    </motion.div>
                                )}

                            </div>
                        }
                    >
                    </Tab>
                )}
            </Tabs>
        </div>
    )
}

export default HomePageType