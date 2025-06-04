
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Trophy, Flame, Users } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface SocialFeedProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: number;
}

const SocialFeed = ({ isOpen, onClose, userProgress }: SocialFeedProps) => {
  const [liked, setLiked] = useState<string[]>([]);

  const mockFeedData = [
    {
      id: "1",
      userName: "Ana Silva",
      avatar: "🌟",
      progress: 85,
      streak: 7,
      achievement: "Completou 1 semana de meditação!",
      timestamp: "2 horas atrás",
      likes: 12,
      comments: 3
    },
    {
      id: "2",
      userName: "Carlos Santos",
      avatar: "⚡",
      progress: 100,
      streak: 15,
      achievement: "Dia perfeito - todos os hábitos completados!",
      timestamp: "4 horas atrás",
      likes: 18,
      comments: 5
    },
    {
      id: "3",
      userName: "Maria Costa",
      avatar: "🔥",
      progress: 60,
      streak: 3,
      achievement: "3 dias seguidos bebendo água suficiente!",
      timestamp: "6 horas atrás",
      likes: 8,
      comments: 2
    }
  ];

  const handleLike = (postId: string) => {
    if (liked.includes(postId)) {
      setLiked(liked.filter(id => id !== postId));
    } else {
      setLiked([...liked, postId]);
      toast.success("💖 Apoio enviado!");
    }
  };

  const handleShare = () => {
    toast.success("Progresso compartilhado com seus aliados!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Feed dos Aliados
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share Progress Card */}
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <h3 className="font-semibold">Compartilhe seu progresso</h3>
                    <p className="text-sm text-muted-foreground">{userProgress}% concluído hoje</p>
                  </div>
                </div>
                <Button onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${userProgress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockFeedData.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{post.userName}</h4>
                        <Badge variant="outline" className="text-xs">
                          <Flame className="h-3 w-3 mr-1" />
                          {post.streak} dias
                        </Badge>
                      </div>
                      
                      <p className="text-sm mb-3">{post.achievement}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1 text-sm transition-colors ${
                              liked.includes(post.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${liked.includes(post.id) ? 'fill-current' : ''}`} />
                            {post.likes + (liked.includes(post.id) ? 1 : 0)}
                          </button>
                          
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </button>
                        </div>
                        
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full transition-all duration-300" 
                            style={{ width: `${post.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{post.progress}% do dia</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialFeed;
