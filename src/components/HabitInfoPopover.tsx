
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface HabitInfo {
  whyDo: string;
  howDo: string;
}

interface HabitInfoPopoverProps {
  habitName: string;
  habitInfo: HabitInfo;
  children: React.ReactNode;
}

const HabitInfoPopover = ({ habitName, habitInfo, children }: HabitInfoPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4" />
              {habitName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="why" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="why">Por que fazer?</TabsTrigger>
                <TabsTrigger value="how">Como fazer?</TabsTrigger>
              </TabsList>
              <TabsContent value="why" className="mt-3">
                <div className="text-sm text-muted-foreground">
                  {habitInfo.whyDo}
                </div>
              </TabsContent>
              <TabsContent value="how" className="mt-3">
                <div className="text-sm text-muted-foreground">
                  {habitInfo.howDo}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default HabitInfoPopover;
