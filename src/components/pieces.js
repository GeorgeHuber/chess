import _bb from "../assets/images/pieces/black_bishop.png"
import _br from "../assets/images/pieces/black_rook.png"
import _bp from "../assets/images/pieces/black_pawn.png"
import _bq from "../assets/images/pieces/black_queen.png"
import _bk from "../assets/images/pieces/black_king.png"
import _bkn from "../assets/images/pieces/black_knight.png"

import _wb from "../assets/images/pieces/white_bishop.png"
import _wr from "../assets/images/pieces/white_rook.png"
import _wq from "../assets/images/pieces/white_queen.png"
import _wp from "../assets/images/pieces/white_pawn.png"
import _wk from "../assets/images/pieces/white_king.png"
import _wkn from "../assets/images/pieces/white_knight.png"

export const fileTree ={
    "black":{
       "bishop":_bb,
       "rook":_br,
       "pawn":_bp,
       "queen":_bq,
       "king":_bk,
       "knight":_bkn
    },
    "white":{
        "bishop":_wb,
        "rook":_wr,
        "pawn":_wp,
        "queen":_wq,
        "king":_wk,
        "knight":_wkn
     }
}

export const isLegalMove = (p,x,y,board,h,w,turn)=>{

    //checks for correct turns
    if(p.color!=turn){
        return false;
    }

    //checks pawn movement
    if(p.type=="pawn"){
        //checks attack
        var square=board[y][x];
        if(square.piece&&square.piece.color!=p.color){
            if(Math.abs(p.x-x)!=1 || y-p.y!=(p.color=="white"?1:-1)){
                return false
            }
            return true
        }
        //todo enpassant check
        //checks movement
        if(p.x!=x){
            return false
        }
        if(p.color=="white" && ((y-p.y!=1) && !(y==3 && p.y==1))){
            return false
        }
        if(p.color=="black" && ((y-p.y!=-1) && !(y==h-4 && p.y==h-2))){
            return false
        }
    }
    if(p.type=="knight"){
        if((x-p.x)**2+(y-p.y)**2!=5){
            return false
        }
        return true
    }

    if(p.type=="king"){
        if(Math.abs(p.x-x)>1 || Math.abs(p.y-y)>1){
            return false
        }
        return true;
    }

    if(p.type=="rook"){
        //checks to make sure area is clear
        if(p.x-x!=0 && p.y-y!=0){
            return false
        }
        if(p.x-x!=0){
            var tx=p.x;
            tx+=(tx<x?1:-1)
            while(tx!=x){
                if(board[p.y][tx].piece){
                    return false
                    
                }
                tx+=(tx<x?1:-1)
            }
        }
        else if(p.y-y!=0){
            var ty=p.y;
            ty+=(ty<y?1:-1)
            while(ty!=y){
                if(board[ty][p.x].piece){
                    return false
                }
                ty+=(ty<y?1:-1)
            }
        }
        return true
    }
    
    if(p.type=="bishop"){
        //checks to make sure area is clear
        if(Math.abs(p.x-x)!=Math.abs(p.y-y)){
            return false
        }
        //diagonals
        else{
            var tx=p.x;
            var ty=p.y
            tx+=(tx<x?1:-1)
            ty+=(ty<y?1:-1)
            while(tx!=x){
                if(board[ty][tx].piece){
                    return false
                }
                tx+=(tx<x?1:-1)
                ty+=(ty<y?1:-1)
            }
        }
        
        return true
    }
    if(p.type=="queen"){
        if(Math.abs(p.x-x)!=Math.abs(p.y-y)){
            if(p.x-x!=0 && p.y-y!=0){
                return false
            }
            if(p.x-x!=0){
                var tx=p.x;
                tx+=(tx<x?1:-1)
                while(tx!=x){
                    if(board[p.y][tx].piece){
                        return false
                        
                    }
                    tx+=(tx<x?1:-1)
                }
            }
            else if(p.y-y!=0){
                var ty=p.y;
                ty+=(ty<y?1:-1)
                while(ty!=y){
                    if(board[ty][p.x].piece){
                        return false
                    }
                    ty+=(ty<y?1:-1)
                }
            }
        } else{
            var tx=p.x;
            var ty=p.y
            tx+=(tx<x?1:-1)
            ty+=(ty<y?1:-1)
            while(tx!=x){
                if(board[ty][tx].piece){
                    return false
                }
                tx+=(tx<x?1:-1)
                ty+=(ty<y?1:-1)
            }
        }
        return true
    }
    return true;
}


export default class Piece{
    constructor(x,y,type,color){
        this.x=x;
        this.y=y;
        this.type=type;
        this.color=color;
        this.img=fileTree[color][type];
    }
    move(x,y){
        this.x=x;
        this.y=y;
    }
}






export const StartingPieces = [
    //white side
    new Piece(0,0,"rook","white"),
    new Piece(7,0,"rook","white"),
    new Piece(1,0,"knight","white"),
    new Piece(6,0,"knight","white"),
    new Piece(2,0,"bishop","white"),
    new Piece(5,0,"bishop","white"),
    new Piece(3,0,"king","white"),
    new Piece(4,0,"queen","white"),
    new Piece(0,1,"pawn","white"),
    new Piece(1,1,"pawn","white"),
    new Piece(2,1,"pawn","white"),
    new Piece(3,1,"pawn","white"),
    new Piece(4,1,"pawn","white"),
    new Piece(5,1,"pawn","white"),
    new Piece(6,1,"pawn","white"),
    new Piece(7,1,"pawn","white"),

    //black side
    new Piece(0,7,"rook","black"),
    new Piece(7,7,"rook","black"),
    new Piece(1,7,"knight","black"),
    new Piece(6,7,"knight","black"),
    new Piece(2,7,"bishop","black"),
    new Piece(5,7,"bishop","black"),
    new Piece(3,7,"king","black"),
    new Piece(4,7,"queen","black"),
    new Piece(0,6,"pawn","black"),
    new Piece(1,6,"pawn","black"),
    new Piece(2,6,"pawn","black"),
    new Piece(3,6,"pawn","black"),
    new Piece(4,6,"pawn","black"),
    new Piece(5,6,"pawn","black"),
    new Piece(6,6,"pawn","black"),
    new Piece(7,6,"pawn","black"),
]