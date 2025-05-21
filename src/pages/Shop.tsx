
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, ChevronLeft, Coins, Gift, ShoppingCart } from "lucide-react";

type ShopItem = {
  id: string;
  type: "avatar" | "coupon" | "boost";
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};

const Shop = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(100); // This would typically come from user state/context
  
  const [items] = useState<ShopItem[]>([
    {
      id: "item1",
      type: "avatar",
      name: "Chapéu de Guerreiro",
      description: "Um chapéu que demonstra sua bravura em batalhas diárias.",
      price: 50,
      image: "🎩",
      rarity: "common"
    },
    {
      id: "item2",
      type: "avatar",
      name: "Capa Mística",
      description: "Uma capa que emana energia e sabedoria.",
      price: 75,
      image: "🧣",
      rarity: "rare"
    },
    {
      id: "item3",
      type: "avatar",
      name: "Coroa do Mestre",
      description: "Simboliza seu domínio sobre os hábitos.",
      price: 150,
      image: "👑",
      rarity: "epic"
    },
    {
      id: "item4",
      type: "coupon",
      name: "10% OFF Academia",
      description: "Desconto em uma academia parceira local.",
      price: 80,
      image: "🏋️",
      rarity: "common"
    },
    {
      id: "item5",
      type: "coupon",
      name: "15% OFF Nutricionista",
      description: "Desconto em consulta com nutricionista parceiro.",
      price: 120,
      image: "🥗",
      rarity: "rare"
    },
    {
      id: "item6",
      type: "boost",
      name: "Boost de XP (24h)",
      description: "Ganhe o dobro de XP por 24 horas.",
      price: 60,
      image: "⚡",
      rarity: "common"
    },
    {
      id: "item7",
      type: "boost",
      name: "Cartas Garantidas",
      description: "Garantia de pelo menos uma carta rara na próxima abertura.",
      price: 100,
      image: "🃏",
      rarity: "rare"
    },
    {
      id: "item8",
      type: "avatar",
      name: "Aura Lendária",
      description: "Uma aura que poucos conseguem obter. Simboliza grande maestria.",
      price: 300,
      image: "✨",
      rarity: "legendary"
    }
  ]);

  const getRarityColor = (rarity: ShopItem["rarity"]) => {
    switch (rarity) {
      case "common": return "bg-gray-200 text-gray-800";
      case "rare": return "bg-blue-200 text-blue-800";
      case "epic": return "bg-purple-200 text-purple-800";
      case "legendary": return "bg-amber-200 text-amber-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  const getRarityLabel = (rarity: ShopItem["rarity"]) => {
    switch (rarity) {
      case "common": return "Comum";
      case "rare": return "Raro";
      case "epic": return "Épico";
      case "legendary": return "Lendário";
      default: return "Comum";
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      toast.success(`Item adquirido: ${item.name}`, {
        description: `Você gastou ${item.price} moedas.`,
      });
    } else {
      toast.error("Moedas insuficientes", {
        description: "Complete mais hábitos para ganhar moedas!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/dashboard")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Loja</h1>
          </div>
          <Badge className="bg-amber-500 gap-1">
            <Coins className="h-4 w-4" />
            {coins} moedas
          </Badge>
        </div>

        {/* Shop Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Loja de Recompensas
            </CardTitle>
            <CardDescription>
              Troque suas moedas por itens especiais para seu avatar e cupons de desconto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="avatar" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="avatar" className="flex gap-1 items-center">
                  <Gift className="h-4 w-4" /> Avatar
                </TabsTrigger>
                <TabsTrigger value="coupon" className="flex gap-1 items-center">
                  <Award className="h-4 w-4" /> Cupons
                </TabsTrigger>
                <TabsTrigger value="boost" className="flex gap-1 items-center">
                  <Coins className="h-4 w-4" /> Boosts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="avatar" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items
                    .filter(item => item.type === "avatar")
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="bg-primary/5 p-4 flex items-center justify-center text-4xl">
                            {item.image}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge className={getRarityColor(item.rarity)}>
                                {getRarityLabel(item.rarity)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-amber-600">
                                <Coins className="h-4 w-4" />
                                <span>{item.price}</span>
                              </div>
                              <Button size="sm" onClick={() => handlePurchase(item)}>
                                Comprar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="coupon" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items
                    .filter(item => item.type === "coupon")
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="bg-primary/5 p-4 flex items-center justify-center text-4xl">
                            {item.image}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge className={getRarityColor(item.rarity)}>
                                {getRarityLabel(item.rarity)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-amber-600">
                                <Coins className="h-4 w-4" />
                                <span>{item.price}</span>
                              </div>
                              <Button size="sm" onClick={() => handlePurchase(item)}>
                                Resgatar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="boost" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items
                    .filter(item => item.type === "boost")
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="bg-primary/5 p-4 flex items-center justify-center text-4xl">
                            {item.image}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge className={getRarityColor(item.rarity)}>
                                {getRarityLabel(item.rarity)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-amber-600">
                                <Coins className="h-4 w-4" />
                                <span>{item.price}</span>
                              </div>
                              <Button size="sm" onClick={() => handlePurchase(item)}>
                                Adquirir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Complete hábitos diários para ganhar mais moedas!
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Shop;
