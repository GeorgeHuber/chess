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
    updatePiece(type){
        this.type=type
        this.img=fileTree[this.color][this.type];
    }
    copy(){
        return new Piece(this.x,this.y, this.type,this.color)
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